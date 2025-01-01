FROM node:18 AS server

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 3000

# Start the app
ENTRYPOINT ["npm", "start"]

FROM  node:18 AS run-migrations
WORKDIR /app
COPY --from=server /app/node_modules ./node_modules
COPY --from=server /app/src/migrations ./src/migrations
COPY --from=server /app/knexfile.js ./knexfile.js

ENV NODE_ENV=development
ENV DEBUG=*

ENTRYPOINT ["npx", "knex"]
CMD ["migrate:latest"]