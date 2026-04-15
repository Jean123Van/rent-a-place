import { PrimaryButton } from '../components/button/PrimaryButton';
import { ShadowedContainer } from '../components/container/ShadowedContainer';
import { DateInput } from '../components/input/DateInput';
import { FormInput } from '../components/input/FormInput';

export const CreateProduct = () => {
    return (
        <div
            style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ShadowedContainer
                style={{
                    maxWidth: '500px',
                    width: '100%',
                    height: 'fit-content',
                }}
            >
                <FormInput label="Title" />
                <FormInput label="Rate (php)" />
                <FormInput label="Description" />
                <DateInput />

                <div
                    style={{
                        justifyContent: 'center',
                        display: 'flex',
                    }}
                >
                    <PrimaryButton>Create</PrimaryButton>
                </div>
            </ShadowedContainer>
        </div>
    );
};
