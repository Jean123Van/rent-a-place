import { GeneralInfoContainer } from './GeneralInfoContainer';

export const SomethingWentWrong = () => {
    return (
        <GeneralInfoContainer>
            <span>Oops! Something went wrong.</span>
            <span>
                Please try again later or let us know if the issues persist so
                we can take a look.
            </span>
        </GeneralInfoContainer>
    );
};
