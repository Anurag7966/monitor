import { resend } from "../lib/resend";
import mail from "@sendgrid/mail";
import notificationemail from "../../emails/notificationemail";



export async function sendNotificationEmail(
    email:string,
    username:string,
){
    try {
        const response=await resend.emails.send({
            from: 'onboarding1@resend.dev',
            to: email,
            subject: 'Changes Alert!!!',
            react:notificationemail({username,url:'https://exam.dtu.ac.in/result.htm'}),
        });
        // console.log(response);
        
        return {success:true,message:'Varification Email Sent Succesfully'}
    } catch (emailError) {
        console.error("Error Sending Verfication Email",emailError)
        return {success:false,message:'Failed to Send Varification Email'}
    }
}