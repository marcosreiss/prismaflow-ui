// src/pages/Login.tsx
import {
    Box,
    Button,
    TextField,
    Paper,
    Link,
    Stack,
    Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "@/hooks/useAuth";
import type { UserLoginRequest } from "@/types/auth";
import { useNotification } from "@/context/NotificationContext";
import { useRouter } from "@/routes/hooks";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
    const { addNotification } = useNotification();
    const router = useRouter();
    const { setToken } = useAuth();


    const { control, handleSubmit } = useForm<UserLoginRequest>({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { mutate: login, isPending } = useLogin();

    const onSubmit = (data: UserLoginRequest) => {
        login(data, {
            onSuccess: (res) => {
                if (res.token && res.data) {
                    setToken(res.token, {
                        username: res.data.username,
                        role: res.data.role,
                    });
                }
                addNotification("Login realizado com sucesso!", "success");
                router.push("/customers");
            },
            onError: (err) => {
                addNotification("Erro ao gerar token. Tente novamente.", "error");
                console.error(err);
            },
        });
    };


    return (
        <Paper
            elevation={4}
            sx={{
                display: "flex",
                width: 800,
                maxWidth: "95%",
                height: 460,
                borderRadius: 4,
                overflow: "hidden",
            }}
        >
            {/* Lado Esquerdo com fundo e texto */}
            <Box
                sx={{
                    flex: 1,
                    backgroundImage:
                        'url("/images/bg_blanck_layout_prismaflow.webp")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                    px: 4,
                    py: 5,
                }}
            >
                {/* Logo no topo */}
                <Box>
                    <img
                        src="/images/logo_prismaflow.webp"
                        alt="Logo PrismaFlow"
                        style={{ height: 52 }}
                    />
                </Box>

                {/* Texto de boas-vindas no centro */}
                <Box>
                    <Typography variant="h3" fontWeight="bold">
                        Hello, welcome!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                        nisi risus.
                    </Typography>
                </Box>
            </Box>

            {/* Lado Direito com formulário */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    px: 4,
                }}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{ width: "100%", maxWidth: 300 }}
                >
                    <Stack spacing={2} width="100%">
                        {/* Username */}
                        <Controller
                            name="username"
                            control={control}
                            rules={{ required: "E-mail é obrigatório" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="E-mail de Acesso:"
                                    variant="outlined"
                                    size="small"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />

                        {/* Password */}
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Senha é obrigatória" }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Senha:"
                                    type="password"
                                    variant="outlined"
                                    size="small"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
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
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isPending}
                            sx={{
                                backgroundColor: "#1f344a",
                                color: "#fff",
                                fontWeight: "bold",
                                mt: 1,
                                "&:hover": {
                                    backgroundColor: "#172b3f",
                                },
                            }}
                        >
                            {isPending ? "Entrando..." : "AVANÇAR"}
                        </Button>
                    </Stack>
                </form>
            </Box>
        </Paper>
    );
}
