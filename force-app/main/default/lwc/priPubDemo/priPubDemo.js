import { LightningElement, api } from 'lwc';

export default class PriPubDemo extends LightningElement {
    message = 'Public Property';
    @api recordId;
}