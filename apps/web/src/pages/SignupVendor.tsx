import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { FormInput } from '../components/input/FormInput';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import { SmallNote } from '../components/Text/SmallNote';

export const SignupVendor = () => {
    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ShadowedContainer
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <FormInput label="Username" />
                    <FormInput label="Email" />
                    <FormInput label="Password" />
                    <PrimaryButton>Sign up</PrimaryButton>
                </form>
                <SmallNote>
                    Already have an account?{' '}
                    <Link to="/signin/vendor">Login</Link> instead.
                </SmallNote>
            </ShadowedContainer>
        </div>
    );
};
