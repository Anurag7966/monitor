import { NextResponse } from "next/server";
import fetch from 'node-fetch';
import dbConnect from "@/lib/dbConnect";
import { sendNotificationEmail } from "@/helpers/sendNotificationEmail";
import DataModel from "@/model/data";


async function fetchHtml(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch HTML. Status: ${response.status}`);
        }
        const html = await response.text();
        return html;
    } catch (error) {
        console.error('Error fetching HTML:', error);
        throw error;
    }
}

export async function GET(req:Request){
    await dbConnect()
    const curr=(await fetchHtml('https://exam.dtu.ac.in/result.htm')).trim();
    
    // Read the file content
    const prev_data = await DataModel.findOne({
        id:'https://exam.dtu.ac.in/result.htm',
    })

    if(prev_data){
        
        const prev=prev_data.data;
        
        if(prev==curr){
            return NextResponse.json(
                {
                    message:"No changes",
                },{status:200}
            )
        }else{
            // console.log(prev.length);
            // console.log(curr.length);
            
            prev_data.data=curr.trim()
            await prev_data.save()
            // console.log("hi1");

           

            const email=['riturajbharti99@gmail.com']
            const username=['Rituraj Bharti']

            for(let i=0;i<email.length;i++){
                const emailResponse=await sendNotificationEmail(
                    email[i],
                    username[i]
                )
                // console.log(emailResponse);
                
                if(!emailResponse.success){
                    return NextResponse.json({
                        message:`Could Not Send Mail to ${username[i]} !!`
                    },{status:500})
                }
            }
            
            return NextResponse.json(
                {
                    message:"Changes Saved and Email Sent",
                },{status:200}
            )


            }


    }else{
        const newData= new DataModel({
            id:'https://exam.dtu.ac.in/result.htm',
            data:curr
        })

        await newData.save()

        return NextResponse.json(
            {
                message:"Database Initialised",
            },{status:200}
        )
    }

    
}