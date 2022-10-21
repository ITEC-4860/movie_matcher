import { html, render } from "lit";
import { repeat } from "lit/directives/repeat";
import "./Library.css";

const rows = [
  {
    title: "New Releases",
    movies: [
      "starwars",
      "birds",
      "bloodshot",
      "onward",
      "underwater",
      "astra",
      "wild",
      "invisible",
      "westworld",
      "ozark"
    ]
  },
  {
    title: "Trending",
    movies: [
      "sonic",
      "knives",
      "little",
      "1917",
      "wick",
      "hollywood",
      "platform",
      "parasite",
      "ford"
    ]
  }
];

function Explore(rows = []) {
  const keyFn = (row) => row.title;
  return html`
    ${repeat(rows, keyFn, (row) => {
      return html`${Row(row)}`;
    })}
  `;
}

function Row({ title, movies }) {
  const keyFn = (movie) => movie;
  return html`
    <div class="ContentRow">
      <div class="ContentRow__title">${title}</div>
      <div class="ContentRow__items">
        <div class="ContentRow__spacer"></div>
        ${repeat(movies, keyFn, (movie) => {
          return html`${Poster(movie)} `;
        })}
      </div>
    </div>
  `;
}

function Poster(movie) {
  return html`
    <button
      class="ContentTile"
  style="background-image:url(public/img/${movie}.jpg)"
      
    ></button>
    <div class="ContentRow__spacer"></div>
  `;
}

render(Explore(rows), document.querySelector(".Explore"));
