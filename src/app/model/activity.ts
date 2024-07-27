export class Activity {
     activityId: number;
     activityDetails: string;
     activityDate: Date;
     activityStatus: string;
     description: string

     constructor(activityId: number, activityDetails: string, activityDate: Date, activityStatus: string, description: string ) {
        this.activityId = activityId;
        this.activityDetails = activityDetails;
        this.activityDate = activityDate;
        this.activityStatus = activityStatus;
        this.description = description
     }
}
