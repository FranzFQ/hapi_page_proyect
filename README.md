## ¡Importante!
Todos los commits tiene que ser en ingles y usando el formato de conventional commits

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
│   │   └── Usuarios/<br/>       
│   ├── static/             # Archivos estáticos recolectados <br/>
│   └── media/              # Archivos subidos por usuarios <br/>
│ <br/>
├── frontend/               # Frontend en React con Vite <br/>
│   ├── index.html <br/>
│   ├── package.json <br/>
│   ├── vite.config.js <br/>
│   └── src/ <br/>
│       ├── App.jsx # Define la ruta principal de la inteface <br/> 
│       ├── main.jsx # Punto de entrada que conecta con el HTML<br/>
│       ├── style/ # Contiene el CSS para el estilo de toda la aplicacion<br/> 
│       ├── Admin-components/ # Componenetes de uso para la vista del admin<br/>
│       ├── global-components/ # Componentes de uso global para admin y usuario<br/> 
│       ├── user-components/ # Componentes de uso para la vista del usuario<br/> 
│       ├── pages/# Vistas que corresponden a cada ruta de la app (ejemplo: "Home.jsx", "login.jsx", "Dashboard.jsx")<br/>    
│       ├── services/       # Llamadas a la API (fetch/axios) <br/>
│       └── context/        # Context API para estados globales <br/>
│ <br/>
├── .gitignore <br/>
└── README.md <br/>

## ejecucíon del proyecto

git clone git@github.com:FranzFQ/hapi_page_proyect.git

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

3. npm install -D tailwindcss postcss autoprefixer

4. npm exec tailwindcss init -p

3. npm run dev

