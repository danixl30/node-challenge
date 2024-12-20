FROM node:22-alpine as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
RUN ls
RUN pnpm install
RUN pnpm run build

FROM node:22-alpine as prod
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY --from=base /app/apps/api-service/dist /app/apps/api-service/dist
COPY --from=base /app/apps/api-service/package.json /app/apps/api-service/package.json
COPY --from=base /app/package.json /app/package.json
COPY --from=base /app/pnpm-lock.yaml /app/pnpm-lock.yaml
COPY --from=base /app/pnpm-workspace.yaml /app/pnpm-workspace.yaml
WORKDIR /app
RUN touch ./apps/api-service/.env
RUN pnpm install -P --ignore-scripts
RUN ls
CMD ["pnpm", "start:prod"]