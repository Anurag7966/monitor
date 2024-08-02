import { resend } from "../lib/resend";
import notificationemail from "../../../emails/notificationemail";


export async function sendNotificationEmail(
    email:string,
    username:string,
){
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Changes Alert!!!',
            react:notificationemail({username,url:'https://exam.dtu.ac.in/result.htm'}),
        });
        return {success:true,message:'Varification Email Sent Succesfully'}
    } catch (emailError) {
        console.error("Error Sending Verfication Email",emailError)
        return {success:false,message:'Failed to Send Varification Email'}
    }
}