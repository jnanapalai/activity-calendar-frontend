export class Activity {
     activityId: number;
     activityDetails: string;
     activityDate: Date;
     activityStatus: string;
     assignedTo: number;
     description: string

     constructor(activityId: number, 
      activityDetails: string, 
      activityDate: Date, 
      activityStatus: string, 
      assingedTo:number, 
      description: string )
      
      {
        this.activityId = activityId;
        this.activityDetails = activityDetails;
        this.activityDate = activityDate;
        this.activityStatus = activityStatus;
        this.assignedTo = assingedTo;
        this.description = description
     }
}
