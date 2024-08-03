import mongoose,{Schema,Document} from "mongoose";

export interface Data extends Document{
    id:string,
    data:string;
}

const DataSchema:Schema<Data> = new Schema({
    id:{
        type:String,
        required:[true,"Url is Required"],
    },
    data:{
        type:String,
        required:[true,"Data is Required"],
        trim:true
    }
})

const DataModel= (mongoose.models.Data as mongoose.Model<Data>) || mongoose.model<Data>("Data",DataSchema)

export default DataModel