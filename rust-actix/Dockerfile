# Use a slim Rust image for building
FROM rust:1.87-slim-bookworm as builder

WORKDIR /app

# Install sqlite3 development libraries required for Diesel
RUN apt-get update && \
    apt-get install -y libsqlite3-dev pkg-config && \
    rm -rf /var/lib/apt/lists/*

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
# You might not need `sqlite3` CLI in production, but `libsqlite3-0` is likely needed for runtime.
RUN apt-get update && \
    apt-get install -y libsqlite3-0 && \
    rm -rf /var/lib/apt/lists/*

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
# You need to ensure the `diesel_cli` is available for these commands if not bundled with your app.
# Since your main app binary is `actix-diesel-example`, it doesn't contain `diesel_cli`.
# A better approach for running migrations is to have a dedicated migration container or run it manually.
# For this example's simplicity, you could either:
# 1. Install diesel_cli in the final image (larger image)
# 2. Run migrations using `cargo run --bin diesel_cli -- migration run` in the builder stage after compilation,
#    but that won't persist the DB in the final image.
# 3. The most robust way is to use a separate `docker-compose` service for migrations.
#
# For now, let's remove the `diesel database setup` and `diesel migration run` from the Dockerfile's CMD
# as the main application binary `actix-diesel-example` does not contain the `diesel_cli` commands.
# You would typically run `docker-compose exec app diesel migration run` after the app is up, or
# have a separate migration service.

# Command to run the application
CMD ["./actix-diesel-example"]