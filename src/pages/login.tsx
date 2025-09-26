import {
    Box,
    Button,
    TextField,
    Paper,
    Link,
    Stack,
    Typography,
} from '@mui/material';

export default function Login() {
    return (
        <Paper
            elevation={4}
            sx={{
                display: 'flex',
                width: 800,
                maxWidth: '95%',
                height: 460,
                borderRadius: 4,
                overflow: 'hidden',
            }}
        >
            {/* Lado Esquerdo com fundo e texto */}
            <Box
                sx={{
                    flex: 1,
                    backgroundImage: 'url("/images/bg_blanck_layout_prismaflow.webp")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 7,
                    px: 4,
                    py: 5,
                }}
            >
                {/* Logo no topo */}
                <Box>
                    <img
                        src="/images/nota1.png"
                        alt="Logo Nota Agile"
                        style={{ height: 52 }}
                    />
                </Box>

                {/* Texto de boas-vindas no centro */}
                <Box>
                    <Typography
                        variant="h3"
                        fontWeight="bold"
                    >
                        Hello, welcome!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{ mt: 2,  }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nisi risus.
                    </Typography>
                </Box>
            </Box>


            {/* Lado Direito com formulário */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 4,
                }}
            >
                <Stack spacing={2} width="100%" maxWidth={300}>
                    <TextField
                        fullWidth
                        label="E-mail de Acesso:"
                        variant="outlined"
                        size="small"
                    />

                    <TextField
                        fullWidth
                        label="Senha:"
                        type="password"
                        variant="outlined"
                        size="small"
                    />

                    <Link
                        href="#"
                        underline="hover"
                        fontSize={13}
                        alignSelf="flex-end"
                    >
                        Esqueci minha senha
                    </Link>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: '#1f344a',
                            color: '#fff',
                            fontWeight: 'bold',
                            mt: 1,
                            '&:hover': {
                                backgroundColor: '#172b3f',
                            },
                        }}
                    >
                        AVANÇAR
                    </Button>
                </Stack>
            </Box>
        </Paper>
    );
}
