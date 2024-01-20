export interface PayablesProps {
  status: boolean;
  paymentDate: Date;
  fee?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payables {
  private props: PayablesProps;
  private _id?: number;

  constructor(props: PayablesProps, id?: number) {
    this.props = props;
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public get status(): boolean {
    return this.props.status;
  }

  public set status(status: boolean) {
    this.props.status = status;
  }

  public get paymentDate(): Date {
    return this.props.paymentDate;
  }

  public set paymentDate(paymentDate: Date) {
    this.props.paymentDate = paymentDate;
  }

  public get fee(): number | undefined {
    return this.props.fee;
  }

  public set fee(fee: number | undefined) {
    this.props.fee = fee;
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
