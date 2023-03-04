# start builder
FROM nikolaik/python-nodejs:python3.10-nodejs16-alpine as builder

WORKDIR /usr/src/app

RUN apk add --no-cache bash
RUN npm install -g pnpm@7.27.0 --loglevel notice

COPY .npmrc .
COPY package.json .

COPY apps/web ./apps/web
COPY libs/dal ./libs/dal
COPY libs/testing ./libs/testing
COPY packages/client ./packages/client
COPY libs/shared ./libs/shared
COPY packages/notification-center ./packages/notification-center
COPY packages/stateless ./packages/stateless
COPY packages/node ./packages/node

COPY tsconfig.json .
COPY tsconfig.base.json .

COPY nx.json .
COPY pnpm-workspace.yaml .
COPY pnpm-lock.yaml .

RUN --mount=type=cache,id=pnpm-store-web,target=/root/.pnpm-store\
  pnpm install --reporter=silent

RUN pnpm add @babel/core -w

COPY [".eslintrc.js",".prettierrc",".prettierignore", "./"]

RUN NX_DAEMON=false pnpm build:web

RUN cd apps/web && pnpm envsetup:docker
# end builder

# start nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production

COPY --from=builder /usr/src/app/apps/web/build /usr/share/nginx/html

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# end nginx
