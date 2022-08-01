import { Component, OnInit } from '@angular/core';

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
}

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styles: [],
})
export class MainComponent implements OnInit {
    tiles: Tile[] = [
        { text: 'Anuncio 1', cols: 3, rows: 3, color: '#13b174' },
        { text: 'Anuncio 2', cols: 1, rows: 4, color: '#13b174' },
        { text: 'Anuncio 3', cols: 1, rows: 1, color: '#13b174' },
        { text: 'Anuncio 4', cols: 2, rows: 1, color: '#13b174' },
    ];

    constructor() {}

    ngOnInit(): void {}
}
