# Use a slim Rust image for building
FROM rust:1.79-slim-bookworm as builder

WORKDIR /app

# Copy Cargo.toml and Cargo.lock to leverage Docker cache
COPY Cargo.toml Cargo.lock ./

# Build a dummy project to cache dependencies
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src target/release/deps/* target/release/examples

# Copy the rest of the application
COPY . .

# Build the release binary
RUN cargo build --release

# Use a smaller base image for the final runtime
FROM debian:bookworm-slim

# Install sqlite3 for runtime (if you need the CLI for debugging inside the container)
# RUN apt-get update && apt-get install -y sqlite3 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the compiled binary from the builder stage
COPY --from=builder /app/target/release/actix-diesel-example .
COPY --from=builder /app/migrations ./migrations
COPY --from=builder /app/templates ./templates
COPY --from=builder /app/.env . 
# Copy .env if you're using it inside the container for production

# Expose the port your Actix Web app listens on
EXPOSE 8080

# Set environment variables for Diesel (if needed outside .env)
ENV DATABASE_URL=./app.db

# Run Diesel migrations
# NOTE: In a production environment, you might want to run migrations as part of your CI/CD pipeline
# or as a separate init container, not every time the app starts.
RUN ./actix-diesel-example diesel database setup && ./actix-diesel-example diesel migration run

# Command to run the application
CMD ["./actix-diesel-example"]