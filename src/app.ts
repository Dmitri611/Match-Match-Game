import { CardsField } from "./components/cards-field/cards-field";

export class App {
  private readonly cardsField: CardsField;

  constructor(private readonly rootElement: HTMLElement) {
    this.cardsField = new cardsField();
    this.rootElement.appendChild(this.cardsField.element);
  }
}
