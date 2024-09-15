export interface TransactionProps {
  amount: number;
  description: string;
  paymentMethod: string;
  cardNumber: string;
  cardOwner: string;
  expirationDate: Date;
  cvv: string;
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

  public set id(id: number | undefined) {
    this._id = id;
  }

  public get amount(): number {
    return this.props.amount;
  }

  public set amount(amount: number) {
    this.props.amount = amount;
  }

  public set description(description: string) {
    this.props.description = description;
  }

  public get description(): string {
    return this.props.description;
  }

  public get paymentMethod(): string {
    return this.props.paymentMethod;
  }

  public set paymentMethod(paymentMethod: string) {
    this.props.paymentMethod = paymentMethod;
  }

  public get cardNumber(): string {
    return this.props.cardNumber;
  }

  public set cardNumber(cardNumber: string) {
    this.props.cardNumber = cardNumber;
  }

  public get cardOwner(): string {
    return this.props.cardOwner;
  }

  public set cardOwner(cardOwner: string) {
    this.props.cardOwner = cardOwner;
  }

  public get expirationDate(): Date {
    return this.props.expirationDate;
  }

  public set expirationDate(expirationDate: Date) {
    this.props.expirationDate = expirationDate;
  }

  public get cvv(): string {
    return this.props.cvv;
  }

  public set cvv(cvv: string) {
    this.props.cvv = cvv;
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
