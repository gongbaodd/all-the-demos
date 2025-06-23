# Stage 1: Build the Go application
FROM golang:1.22-bookworm AS builder 
# Using Debian Bookworm as an example

WORKDIR /app

# Copy go.mod and go.sum files to download dependencies
COPY go.mod ./
COPY go.sum ./

# Copy the rest of the application source code
COPY . .

# Download all dependencies
RUN go mod download

# Install build dependencies for CGO
# 'build-essential' includes gcc, g++ and make. 'libsqlite3-dev' provides SQLite development headers.
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/* # Clean up apt cache

# Build the application
# CGO_ENABLED=1 is required for SQLite support
RUN CGO_ENABLED=1 go build -ldflags "-s -w" -o app .

# Stage 2: Create a minimal production image
FROM debian:bookworm-slim 
# A slimmer Debian image for runtime

# Install necessary runtime dependencies for CGO-enabled binaries
# 'libsqlite3-0' provides the SQLite runtime library.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libsqlite3-0 \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/* # Clean up apt cache


# Set working directory inside the container
WORKDIR /root/

# Copy the compiled binary from the builder stage
COPY --from=builder /app/app .

# Expose port 3000 where the Fiber app will listen
EXPOSE 3000

# Command to run the application
CMD ["./app"]