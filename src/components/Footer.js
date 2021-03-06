import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';


function Footer(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props.sx}
        >
            {"Copyright © "}
            <Link color="inherit" href={process.env.REACT_APP_FRONT_URL}>
                Ecommerce
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default Footer;