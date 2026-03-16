import { SignUp } from '@components/clerk/SignUp';

const SignUpScreen = () => (
	<SignUp
		signInUrl='/sign-in'
		scheme='pokemon-flashlist-swipe'
	/>
);

export default SignUpScreen;
