## Conventional commits
- feat: Para nuevas funcionalidades o características. <br/>

- fix: Para corregir errores o bugs. <br/>

- docs: Para cambios en documentación o comentarios. <br/>

- style: Cambios de formato, estilo o espacios (sin modificar lógica). <br/>

- refactor: Cambios en el código que no afectan la funcionalidad. <br/>

- test: Agregar o modificar pruebas. <br/>

- chore: Tareas de mantenimiento o configuración que no afectan código. <br/>

## Estructura de los archivos

mi_proyecto/ <br/>
│ <br/>
├── backend/                # Backend en Django <br/>
│   ├── manage.py <br/>
│   ├── requirements.txt <br/>
│   ├── backend/            # Configuración principal de Django <br/>
│   │   ├── settings.py <br/>
│   │   ├── urls.py <br/>
│   │   └── ... <br/>
│   ├── apps/               # Aplicaciones personalizadas de Django <br/>
│   │   └── usuarios/ <br/>       
│   ├── static/             # Archivos estáticos recolectados <br/>
│   └── media/              # Archivos subidos por usuarios <br/>
│ <br/>
├── frontend/               # Frontend en React con Vite <br/>
│   ├── index.html <br/>
│   ├── package.json <br/>
│   ├── vite.config.js <br/>
│   └── src/ <br/>
│       ├── App.jsx <br/> 
│       ├── main.jsx <br/> 
│       ├── components/ <br/> 
│       ├── pages/ <br/> 
│       ├── services/       # Llamadas a la API (fetch/axios) <br/>
│       └── context/        # Context API para estados globales <br/>
│ <br/>
├── .gitignore <br/>
└── README.md <br/>

## ejecucíon del proyecto

git clone https://github.com/usuario/mi_proyecto.git

## Configuracion del backend
1. ubicarse en la carpeta backend <br/>

2. python -m venv venv <br/>

3. source venv/bin/activate   # Linux/Mac <br/> 
venv\Scripts\activate      # Windows <br/>

5. pip install -r requirements.txt <br/>

6. python manage.py migrate <br/>

7. python manage.py runserver <br/>

## Configuracion del frontend
1. ubicarse en la carpeta frontend

2. npm install

3. npm run dev

