from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from swarm_manager import SwarmManager
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="MAYA Swarm Engine")
swarm = SwarmManager()

class TaskRequest(BaseModel):
    prompt: str
    byok_key: str = None
    provider: str = "openrouter"

@app.get("/health")
async def health():
    return {"status": "healthy", "engine": "MAYA OWL"}

@app.post("/swarm/run")
async def run_swarm(request: TaskRequest):
    try:
        # Pass the BYOK key to the swarm manager
        result = await swarm.execute_task(request.prompt, request.byok_key)
        return {"status": "success", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
