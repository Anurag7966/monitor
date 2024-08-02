import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
  } from '@react-email/components';
import { URL } from 'url';
  
  interface VerificationEmailProps {
    username: string;
    url: string;
  }
  
  export default function notificationemail({ username, url }: VerificationEmailProps) {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <title>Changes Alert!!!</title>
          <Font
            fontFamily="Roboto"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Preview>Hey The Result Site has Changed!!</Preview>
        <Section>
          <Row>
            <Heading as="h2">Hello {username},</Heading>
          </Row>
          <Row>
            <Text>
              You might want to go to Examination Site.
            </Text>
          </Row>
          <Row>
            <Text>{url}</Text> 
          </Row>
          <Row>
            <Text>
              If you did not sign up for this alert, please ignore this email.
            </Text>
          </Row>
        </Section>
      </Html>
    );
  }