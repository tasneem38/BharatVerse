import subprocess
import time

def test_ollama():
    print("Testing Ollama connection...")
    start = time.time()
    try:
        proc = subprocess.run(
            ["ollama", "run", "llama3", "Say Hello"],
            capture_output=True,
            check=True,
            timeout=30
        )
        print(f"Success! Response ({time.time() - start:.2f}s):")
        print(proc.stdout.decode("utf-8"))
    except Exception as e:
        print(f"Error: {e}")
        if isinstance(e, subprocess.CalledProcessError):
            print(f"Stderr: {e.stderr.decode('utf-8')}")

if __name__ == "__main__":
    test_ollama()
