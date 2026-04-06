import { Link } from 'react-router-dom';
import { PrimaryButton } from '../components/button/PrimaryButton';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import { FormInput } from '../components/input/FormInput';
import { SmallNote } from '../components/Text/SmallNote';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const navigate = useNavigate();

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
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <FormInput label="Username" />
                    <FormInput label="Password" />
                    <PrimaryButton
                        onClick={() => {
                            navigate('/home');
                        }}
                    >
                        Log in
                    </PrimaryButton>
                </form>
                <SmallNote>
                    Don't have an account yet? Signup{' '}
                    <Link to="/signup">here</Link>.
                </SmallNote>
            </ShadowedContainer>
        </div>
    );
};
