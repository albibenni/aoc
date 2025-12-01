.PHONY: run help clean

# Default target
help:
	@echo "Usage: make run LANG=<language> FILE=<path-after-src>"
	@echo ""
	@echo "Examples:"
	@echo "  make run LANG=ts FILE=advent2025/1.ts"
	@echo "  make run LANG=go FILE=main.go"
	@echo "  make run LANG=rust FILE=main.rs"
	@echo "  make run LANG=py FILE=advent2024/day1.py"
	@echo ""
	@echo "Supported languages: ts, js, go, rust (rs), py, java, cpp, c"

# Variables
LANG ?= ts
FILE ?=
SRC_DIR = src

# Validate that FILE is provided
run:
ifndef FILE
	@echo "Error: FILE parameter is required"
	@echo "Usage: make run LANG=<language> FILE=<path-after-src>"
	@exit 1
endif
	@$(MAKE) -s run-$(LANG)

# TypeScript
run-ts:
	@echo "Running TypeScript: $(SRC_DIR)/$(FILE)"
	@if command -v bun >/dev/null 2>&1; then \
		bun run $(SRC_DIR)/$(FILE); \
	elif command -v node >/dev/null 2>&1; then \
		node $(SRC_DIR)/$(FILE); \
	elif command -v deno >/dev/null 2>&1; then \
		deno run --allow-all $(SRC_DIR)/$(FILE); \
	else \
		echo "Error: No TypeScript runtime found. Install bun, ts-node, or deno."; \
		exit 1; \
	fi

# JavaScript
run-js:
	@echo "Running JavaScript: $(SRC_DIR)/$(FILE)"
	@if command -v bun >/dev/null 2>&1; then \
		bun run $(SRC_DIR)/$(FILE); \
	elif command -v node >/dev/null 2>&1; then \
		node $(SRC_DIR)/$(FILE); \
	else \
		echo "Error: No JavaScript runtime found. Install node or bun."; \
		exit 1; \
	fi

# Go
run-go:
	@echo "Running Go: $(SRC_DIR)/$(FILE)"
	@go run $(SRC_DIR)/$(FILE)

# Rust
run-rust run-rs:
	@echo "Running Rust: $(SRC_DIR)/$(FILE)"
	@rustc $(SRC_DIR)/$(FILE) -o /tmp/rust_temp_binary && /tmp/rust_temp_binary && rm /tmp/rust_temp_binary

# Python
run-py run-python:
	@echo "Running Python: $(SRC_DIR)/$(FILE)"
	@python3 $(SRC_DIR)/$(FILE)

# Java
run-java:
	@echo "Running Java: $(SRC_DIR)/$(FILE)"
	@javac $(SRC_DIR)/$(FILE) -d /tmp && java -cp /tmp $$(basename $(FILE) .java)

# C++
run-cpp:
	@echo "Running C++: $(SRC_DIR)/$(FILE)"
	@g++ $(SRC_DIR)/$(FILE) -o /tmp/cpp_temp_binary && /tmp/cpp_temp_binary && rm /tmp/cpp_temp_binary

# C
run-c:
	@echo "Running C: $(SRC_DIR)/$(FILE)"
	@gcc $(SRC_DIR)/$(FILE) -o /tmp/c_temp_binary && /tmp/c_temp_binary && rm /tmp/c_temp_binary

# Clean temporary files
clean:
	@rm -f /tmp/rust_temp_binary /tmp/cpp_temp_binary /tmp/c_temp_binary
	@echo "Cleaned temporary files"
