import { ProfileClient } from 'src/modules/profileClient/application/entities/profileClient';
import { Transaction } from './transaction';

export interface PayableProps {
  profileClient: number | ProfileClient;
  transaction: number | Transaction;
  status: string;
  paymentDate: Date;
  fee?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Payable {
  private props: PayableProps;
  private _id?: number;

  constructor(props: PayableProps, id?: number) {
    this.props = props;
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(id: number | undefined) {
    this._id = id;
  }

  public set profileClient(profileClient: number) {
    this.props.profileClient = profileClient;
  }

  public get profileClient(): number | ProfileClient {
    return this.props.profileClient;
  }

  public set transaction(transaction: number) {
    this.props.transaction = transaction;
  }

  public get transaction(): number | Transaction {
    return this.props.transaction;
  }

  public get status(): string {
    return this.props.status;
  }

  public set status(status: string) {
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
