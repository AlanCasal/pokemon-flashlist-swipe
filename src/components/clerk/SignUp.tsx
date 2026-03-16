import { useSignUp } from '@clerk/clerk-expo';
import Menu from '@components/Menu';
import { useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import InitialSignUpForm from './forms/InitialSignUpForm';
import VerifyEmailCodeSignUpForm from './forms/VerifyEmailCodeSignUpForm';

enum FormState {
  SignIn,
  VerifyEmailCode,
}

interface Props {
  scheme?: string;
  signInUrl?: string;
  homeUrl?: string;
}

export function SignUp({ scheme = "catalystapp", signInUrl = "/(auth)", homeUrl = "/" }: Props) {
  const { isLoaded } = useSignUp();
  const [formState, setFormState] = useState<FormState>(FormState.SignIn);
  const [emailAddress, setEmailAddress] = useState('');

  if (!isLoaded) {
    return (
      <>
        <Menu showSignOut={false} />
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      </>
    )
  }

  let content: React.ReactNode = null;

  switch(formState) {
    case FormState.SignIn:
      content = (
        <InitialSignUpForm 
          onContinue={(emailAddress: string) => {
            setEmailAddress(emailAddress);
            setFormState(FormState.VerifyEmailCode);
          }}
          scheme={scheme}
          signInUrl={signInUrl}
        />
      );
      break;
    case FormState.VerifyEmailCode:
      content = (
        <VerifyEmailCodeSignUpForm 
          emailAddress={emailAddress}
          onEditEmailAddress={() => {
            setFormState(FormState.SignIn);
          }}
          homeUrl={homeUrl}
        />
      );
      break;
    default:
      content = null;
  }

  return (
    <>
      <Menu showSignOut={false} />
      {content}
    </>
  );
}

export default SignUp;
