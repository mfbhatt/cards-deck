import { Component, ElementRef } from '@angular/core';
import { NgClass } from '@angular/common';
import { animate, state, style, transition, trigger, keyframes, query, stagger } from '@angular/animations';
import { element } from 'protractor';
import { relative } from 'path';

//card interface to hold the card information.
interface Card {
  suit: string;
  rank: string;
  style: string;
  index: number;
}


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        position: 'relative'
      })),
      state('hide', style({
        position: 'absolute'
      })),
      transition('show => hide', animate('100ms ease-in')),
      transition('hide => show', animate('100ms ease-in'))
    ]),
    trigger('fade', [
      transition('void => *', [
        animate(300, style({ transform: 'scale(2.0)' }))
      ])

    ])
  ]
})



export class CardsComponent {

  private options;
  cards: any[] = [];
  cardsElement: any;
  show = false;
  dragCard: any;

  constructor(cardsElement: ElementRef) {

    this.cardsElement = cardsElement.nativeElement;
    this.options = {
      suits: ["hearts", "diamonds", "clubs", "spades"],
      ranks: [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]

    }
    this.generate();
  }


  //method to generate the cards..
  generate() {
    this.cards = [];
    this.options.suits.forEach((suit, suitIndex, array) => {
      this.options.ranks.forEach((rank, rankIndex, array) => {
        let cssClass = `card ${suit} rank${rankIndex + 1}`;
        let index = suitIndex + rankIndex;
        this.inlay({
          suit: suit, rank: rank, style: cssClass, index: index
        });
      });
    });
  }


  //shuffle the cards randomly..
  shuffle() {
    var currentIndex = this.cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  }

  //sort cards by CHTP
  sortCHTP() {
    var newArray = this.getCardsBySuit("clubs");
    newArray = newArray.concat(this.getCardsBySuit("hearts"));
    newArray = newArray.concat(this.getCardsBySuit("diamonds"))
    newArray = newArray.concat(this.getCardsBySuit("spades"))

    this.cards = newArray;
  }
  //sort cards by HCTP
  sortHCTP() {
    var newArray = this.getCardsBySuit("hearts");
    newArray = newArray.concat(this.getCardsBySuit("clubs"));
    newArray = newArray.concat(this.getCardsBySuit("diamonds"))
    newArray = newArray.concat(this.getCardsBySuit("spades"))

    this.cards = newArray;
  }
  //sort cards by HTCP
  sortHTCP() {
    var newArray = this.getCardsBySuit("hearts");
    newArray = newArray.concat(this.getCardsBySuit("diamonds"));
    newArray = newArray.concat(this.getCardsBySuit("clubs"))
    newArray = newArray.concat(this.getCardsBySuit("spades"))

    this.cards = newArray;
  }
  //sort cards by HTPC
  sortHTPC() {
    var newArray = this.getCardsBySuit("hearts");
    newArray = newArray.concat(this.getCardsBySuit("diamonds"));
    newArray = newArray.concat(this.getCardsBySuit("spades"))
    newArray = newArray.concat(this.getCardsBySuit("clubs"))

    this.cards = newArray;
  }

  //get the suite by type
  getCardsBySuit(suit) {
    var tempCards = this.cards.slice(0);
    return tempCards.filter(card => card.suit == suit);
  }

  //push the cards in the list
  inlay(card: Card): boolean {
    if (card && card.suit && card.rank) {
      this.cards.push(card);
      return true;
    }
    else
      return false;
  }

  //get the state...
  get stateName() {
    return this.show ? 'show' : 'hide'
  }

  //toggle the state...
  toggle() {
    this.show = !this.show;
  }

  //drag the card.
  startDrag(card) {
    this.dragCard = card;
  }
  //drop the card..
  addDropItem($event) {
    var index = -1;
    var tempCards = this.cards.slice(0);
    var element = event.target as HTMLElement;
    if (element.hasAttribute("data-index")) {
      index = parseInt(element.getAttribute("data-index"));
    }
    else if (element.parentElement.hasAttribute("data-index")) {
      index = parseInt(element.parentElement.getAttribute("data-index"));
    }
    else if (element.parentElement.parentElement.hasAttribute("data-index")) {
      index = parseInt(element.parentElement.parentElement.getAttribute("data-index"));
    }
    if (index > 0) {
      tempCards.splice(index, 0, tempCards.splice(this.dragCard.index, 1)[0]);
    }
    var cards = []
    tempCards.forEach(function (tempCard, index, arr) {
      tempCard.index = index;
    });

    this.cards = tempCards;
  }


}


