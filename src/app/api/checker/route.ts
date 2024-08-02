import { NextResponse } from "next/server";
import { promises as fs } from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { sendNotificationEmail } from "@/app/helpers/sendNotificationEmail";


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
    const filePath = path.join(process.cwd(), 'public', 'site.txt');
    
    // Read the file content
    const prev = await fs.readFile(filePath, 'utf8');
    const curr=await fetchHtml('https://exam.dtu.ac.in/result.htm');
    

    if(prev==curr){
        return NextResponse.json(
            {
                message:"No changes",
            },{status:200}
        )
    }else{
        await fs.writeFile(filePath, curr, 'utf8');
        const email=['riturajbharti99@gmail.com']
        const username=['Rituraj Bharti']

        for(let i=0;i<email.length;i++){
            const emailResponse=await sendNotificationEmail(
                email[i],
                username[i]
            )

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

    
}