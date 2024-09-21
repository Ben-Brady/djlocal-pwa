import { Helmet } from "react-helmet";

type MetadataProps = {
    title?: string;
};

const Metadata = ({ title }: MetadataProps) => {
    title ??= "Musicly";

    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    );
};

export default Metadata;
