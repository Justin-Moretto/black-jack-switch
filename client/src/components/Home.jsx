import { Deck, Hand } from "../helpers/cardLogic";
import useApplicationData from "../hooks/useApplicationData"

import Table from "./Table";
import Chips from "./Chips";
import Actions from './Actions';

import "./Home.css";


// hand[1].canSplit = false;
// hand[2].canSplit = false;

let deck = new Deck(1);
let dealer = new Hand();
let swapped = false;

let actions = {
  deal: true,
  split: true,
  switch: true
}

export default function Home(props) {
  const {
    state,
    updateHand,
    addSplitHand,
    updateGame
  } = useApplicationData();

  let hand = state.hand;
  let currentHand = state.currentHand;
  if (hand[currentHand]) actions.split = hand[currentHand].canSplit;

  const deal = () => {
      swapped = false;
      actions.deal = false;
      updateHand(hand[0]);
      setTimeout(() => { hit(hand[0]) }, 400);
      setTimeout(() => { hit(hand[0]) }, 1600);

      setTimeout(() => { hit(hand[1]) }, 800);
      setTimeout(() => { hit(hand[1]) }, 2000);

      setTimeout(() => { hit(dealer) }, 1200);
      setTimeout(() => { hit(dealer) }, 2400);
  }

  const hit = (hand) => {
      hand.add(deck.draw())
      updateHand(hand);
  }

  const stay = () => {
    if (currentHand < hand.length - 1) {
      currentHand++
      updateHand(hand[currentHand]);
      updateGame(currentHand);
    }
  }


  const split = () => {
    if (hand[currentHand].canSplit === true) {
      hand[currentHand].canSplit = false;
      let newHand = new Hand(hand[currentHand].splitHand())
      addSplitHand(newHand);
      updateHand(hand[currentHand])
      setTimeout(() => { hit(hand[currentHand]) }, 500);
      updateHand(hand[currentHand + 1])
      setTimeout(() => { hit(hand[currentHand + 1]) }, 1000);
    }
  }

  const doubleDown = () => {
    //add code to double current hand's bet here
    hit(hand[currentHand]);
    stay()
  }

  //switch is not allowed as a function name in js, use swap instead
  const swap = (hand1, hand2) => {
    if (swapped === false) {
      swapped = true;
      actions.switch = false;
      let temp = hand1.cards[1];
      hand1.cards[1] = hand2.cards[1];
      hand2.cards[1] = temp;
      updateHand(hand1);
      updateHand(hand2);
    }
  }

  
  return (
    <div class="table">
      <Table
        cardLibrary={state.cards}
        deck={deck}
        hand={hand}
        dealer={dealer}
        currentHand={currentHand}
      />
      <Actions
        hit={() => hit(hand[currentHand])}
        hitD={() => hit(dealer)}
        stay={() => stay()}
        deal={() => deal()}
        swap={() => swap(hand[0], hand[1])}
        split={() => split()}
        double={() => doubleDown()}
        actions={actions}
      />
      <Chips />

    </div>
  )
}