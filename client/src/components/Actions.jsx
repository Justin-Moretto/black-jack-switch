import "./Actions.css";

export default function Actions(props) {
  let deal = "deal";
  let swap = "switch";
  let split = "split";
  let hit = "hit";
  let stay = "stay";
  let double = "double"

  if (!props.actions.deal) {
    deal = deal + "-hidden"
  }

  if (!props.actions.switch) {
    swap = swap + "-hidden"
  }

  if (!props.actions.split) {
    split = split + "-hidden"
  }


  return (
    <div class="Actions">

      <span class={deal}>
        <button type="button" class="Deal" onClick={props.deal}>Deal</button>
      </span>

      <span class={swap}>
        <button type="button" class="Switch" onClick={props.swap} >Switch</button>
      </span>

      <span class={hit}>
        <button type="button" class="Hit" onClick={props.hit}>Hit</button>
      </span>

      <span class={split}>
        <button type="button" class="Split" onClick={props.split}>Split</button>
      </span>

      <button type="button" class="Hit" onClick={props.hitD}>Dealer</button>

      <span class={stay}>
        <button type="button" class="Stay" onClick={props.stay}>Stay</button>
      </span>

      <span class={double}>
        <button type="button" class="Double" onClick={props.double}>Double Down</button>
      </span>
    </div>
  )
}
