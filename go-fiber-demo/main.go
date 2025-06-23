package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Product represents a simple product model
type Product struct {
	gorm.Model
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

var DB *gorm.DB

func main() {
	// Initialize Fiber app
	app := fiber.New()

	// Initialize database
	initDatabase()

	// Setup routes
	setupRoutes(app)

	// Start the server
	log.Fatal(app.Listen(":3000"))
}

// initDatabase initializes the SQLite database connection
func initDatabase() {
	var err error
	DB, err = gorm.Open(sqlite.Open("gorm.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// Auto-migrate the Product model to create the table if it doesn't exist
	err = DB.AutoMigrate(&Product{})
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}

	log.Println("Database successfully connected and migrated!")
}

// setupRoutes defines the API endpoints
func setupRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, Fiber with GORM and SQLite!")
	})

	// Products API group
	api := app.Group("/api")
	products := api.Group("/products")

	// Create a new product
	products.Post("/", createProduct)
	// Get all products
	products.Get("/", getProducts)
}

// createProduct handles the creation of a new product
func createProduct(c *fiber.Ctx) error {
	product := new(Product)

	// Parse JSON request body into Product struct
	if err := c.BodyParser(product); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Cannot parse JSON",
		})
	}

	// Validate input (simple check for name and price)
	if product.Name == "" || product.Price <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Product name and positive price are required",
		})
	}

	// Save product to database
	if result := DB.Create(product); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not create product",
		})
	}

	return c.Status(fiber.StatusCreated).JSON(product)
}

// getProducts handles fetching all products from the database
func getProducts(c *fiber.Ctx) error {
	var products []Product
	if result := DB.Find(&products); result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not retrieve products",
		})
	}
	return c.JSON(products)
}
