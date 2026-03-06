package config

import (
	"context"
	"fmt"

	"github.com/jackc/pgx/v5/pgxpool"
)

func DbConnect() *pgxpool.Pool {

	ctx := context.Background()

	connStr := "postgres://postgres:admin@localhost:5432/Got_Milk"

	pool, err := pgxpool.New(ctx, connStr)

	if err != nil {
		fmt.Println("Database connection error:", err)
		return nil
	}

	err = pool.Ping(ctx)

	if err != nil {
		fmt.Println("Database ping error:", err)
		return nil
	}

	fmt.Println("Database connected successfully")

	return pool
}