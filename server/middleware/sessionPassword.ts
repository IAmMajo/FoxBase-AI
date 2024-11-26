export default defineEventHandler((event) => {
  useRuntimeConfig(event).session.password = event.context.cloudflare.env
    .SESSION_PASSWORD as string;
});
