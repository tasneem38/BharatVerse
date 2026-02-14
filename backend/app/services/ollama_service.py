import subprocess

class OllamaService:
    def __init__(self, model="gemma:2b"):
        self.model = model

    def chat(self, prompt: str) -> str:
        """Call Ollama for local AI inference"""
        try:
            proc = subprocess.run(
                ["ollama", "run", self.model],
                input=prompt.encode("utf-8"),
                capture_output=True,
                check=True,
                timeout=60
            )
            return proc.stdout.decode("utf-8").strip()
        except subprocess.CalledProcessError as e:
            return f"Ollama error: {e.stderr.decode('utf-8').strip()}"
        except subprocess.TimeoutExpired:
            return "Ollama timeout: Request took too long"
        except Exception as ex:
            return f"Ollama exception: {str(ex)}"

# Singleton
ollama_service = OllamaService()
