export interface TransactionProps {
  value: number;
  description: string;
  method: string;
  cardNumber: number;
  cardOwner: string;
  cardExpiration: Date;
  cvvCard: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Transaction {
  private props: TransactionProps;
  private _id?: number;

  constructor(props: TransactionProps, id?: number) {
    this.props = props;
    this._id = id;
  }

  public get id() {
    return this._id;
  }

  public set value(value: number) {
    this.props.value = value;
  }

  public get value(): number {
    return this.props.value;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public get method(): string {
    return this.props.method;
  }

  public set method(method: string) {
    this.props.method = method;
  }

  public get cardNumber(): number {
    return this.props.cardNumber;
  }

  public set cardNumber(cardNumber: number) {
    this.props.cardNumber = cardNumber;
  }

  public get cardOwner(): string {
    return this.props.cardOwner;
  }

  public set cardOwner(cardOwner: string) {
    this.props.cardOwner = cardOwner;
  }

  public get cardExpiration(): Date {
    return this.props.cardExpiration;
  }

  public set cardExpiration(cardExpiration: Date) {
    this.props.cardExpiration = cardExpiration;
  }

  public get cvvCard(): string {
    return this.props.cvvCard;
  }

  public set cvvCard(cvvCard: string) {
    this.props.cvvCard = cvvCard;
  }

  public get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  public set createdAt(createdAt: Date | undefined) {
    this.props.createdAt = createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }

  public set updatedAt(updatedAt: Date | undefined) {
    this.props.updatedAt = updatedAt;
  }
}
