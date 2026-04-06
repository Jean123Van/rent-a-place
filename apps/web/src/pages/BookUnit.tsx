import { useParams } from 'react-router-dom';

export const BookUnit = () => {
    const { id } = useParams();

    return <p>{id}</p>;
};
