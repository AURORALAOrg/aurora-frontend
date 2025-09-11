# Start `AURORA-Frontend`  -  Installation and Usage Guide
## Prerequisites
- Install [Node.js](https://nodejs.org/) (16.x or later).

## Steps

1. **Clone and Navigate**  
   ```bash
   git clone https://github.com/AURORALAOrg/AURORA-Frontend.git
   cd AURORA-Frontend

2. **Install Dependencies**
   ```bash
   pnpm install
 
  Make sure you have all the necessary dependencies installed before proceeding.

3. **Start Development Server**
   ```bash
    cp .env.example .env
    pnpm  dev
The app will be available at http://localhost:5173/

4. **Audio Example for Placement Test**  
   ```bash
   https://drive.google.com/file/d/19L9GtZZedgIgtYJkN9VyoEMTGWJX9nf9/view?usp=sharing

 ## Additional Scripts
   
 - **`pnpm audit`**: Checks for security vulnerabilities in
     the project's dependencies.
 - **`pnpm analyze`**: Builds the project and opens a
     bundle visualizer to inspect the size of the output files.

