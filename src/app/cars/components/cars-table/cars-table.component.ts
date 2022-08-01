import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of, Subject } from 'rxjs';
import {
    catchError,
    debounceTime,
    map,
    startWith,
    switchMap,
} from 'rxjs/operators';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Car } from 'src/app/shared/interfaces/car.interface';
import { Role } from 'src/app/shared/interfaces/role.interface';
import { User } from 'src/app/shared/interfaces/user.interface';
import { RolesService } from 'src/app/shared/services/roles.service';
import { CarsService } from '../../services/cars.service';

@Component({
    selector: 'app-cars-table',
    templateUrl: './cars-table.component.html',
    styles: [],
})
export class CarsTableComponent implements OnInit {
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    user!: User;
    roles: Role[] = [];
    cars: Car[] = [];
    canEdit: boolean = false;

    displayedColumns: string[] = [
        'name',
        'trademark',
        'year',
        'price',
        'sold',
        'actions',
    ];

    dataSource!: MatTableDataSource<Car>;
    debouncer: Subject<string> = new Subject();

    filterText: string = '';
    resultsLength: number = 0;
    isLoadingResults: boolean = true;
    isRateLimitReached: boolean = false;

    constructor(
        private carsService: CarsService,
        private rolesService: RolesService,
        private tokenStorageService: TokenStorageService
    ) {}

    ngOnInit(): void {
        this.debouncer.subscribe((value) => {
            this.filterText = value;
        });

        this.user = this.tokenStorageService.getUser().data;

        if (this.user) {
            this.rolesService
                .getRolesByRelatedUrl(this.user.id)
                .subscribe((response) => {
                    this.roles = response.data;

                    this.canEdit = !this.roles.some(
                        this.rolesService.hasCostumerRole
                    );
                });
        }
    }

    ngAfterViewInit() {
        //* If the user changes the sort order, reset back to the first page.
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

        merge(this.sort.sortChange, this.paginator.page, this.debouncer)
            .pipe(
                debounceTime(300),
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.carsService
                        .getCarsWithParams(this.searchParams)
                        .pipe(catchError(() => of(null)));
                }),
                map((response) => {
                    this.isLoadingResults = false;
                    this.resultsLength = response.meta.page.total;

                    return response.data;
                })
            )
            .subscribe((response) => {
                this.cars = response;

                this.dataSource = new MatTableDataSource(this.cars);
                this.setFiltering();
                this.setSorting();
            });
    }

    private setFiltering(): void {
        this.dataSource.filterPredicate = (car, filter) => {
            return (
                car.attributes.name.toLocaleLowerCase().includes(filter) ||
                car.attributes.trademark.toLocaleLowerCase().includes(filter)
            );
        };
    }

    private setSorting(): void {
        this.dataSource.sortingDataAccessor = (team, property) => {
            let key: keyof typeof team.attributes;
            let field: string = '';

            for (key in team.attributes) {
                if (key === property) {
                    field = team.attributes[key].toString();
                }
            }

            return field;
        };
    }

    private get searchParams(): HttpParams {
        let params = new HttpParams()
            .append('page[size]', this.paginator.pageSize)
            .append('page[number]', this.paginator.pageIndex + 1)
            .append('sort', this.sortParam);

        params = params.append('filter[search]', this.filterText);

        return params;
    }

    private get sortParam() {
        if (this.sort.direction === 'asc') {
            return `-${this.sort.active}`;
        }
        return this.sort.active;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.debouncer.next(filterValue.trim().toLowerCase());
    }
}
