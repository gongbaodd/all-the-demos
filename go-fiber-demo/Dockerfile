# Stage 1: Build the Go application
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copy go.mod and go.sum files to download dependencies
COPY go.mod ./
COPY go.sum ./

# Download all dependencies
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the application
# CGO_ENABLED=0 is important for static linking, which makes the binary standalone
# -o app specifies the output binary name
# ./... builds all modules in the current directory
RUN CGO_ENABLED=0 go build -ldflags "-s -w" -o app ./...

# Stage 2: Create a minimal production image
FROM alpine:latest

# Set working directory inside the container
WORKDIR /root/

# Copy the compiled binary from the builder stage
COPY --from=builder /app/app .

# Expose port 3000 where the Fiber app will listen
EXPOSE 3000

# Command to run the application
CMD ["./app"]
