#!/bin/bash

# Script para desplegar en Vercel
# Uso: ./deploy.sh

echo "🚀 Desplegando Nexus Platform en Vercel..."
echo ""

# Verificar si git está instalado
if ! command -v git &> /dev/null; then
    echo "❌ Git no está instalado. Instálalo primero."
    exit 1
fi

# Verificar si hay cambios sin commitear
if [[ -n $(git status -s) ]]; then
    echo "📝 Hay cambios sin commitear. Guardando cambios..."
    
    read -p "Ingresa mensaje del commit: " commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="Update: Deployment $(date +%Y-%m-%d)"
    fi
    
    git add .
    git commit -m "$commit_message"
else
    echo "✅ No hay cambios nuevos"
fi

# Push a GitHub
echo ""
echo "📤 Subiendo a GitHub..."
git push origin Update

if [ $? -eq 0 ]; then
    echo "✅ Push exitoso"
    echo ""
    echo "🎉 Si ya configuraste Vercel, el despliegue iniciará automáticamente"
    echo "📊 Revisa el dashboard: https://vercel.com/dashboard"
    echo ""
    echo "Si aún no has configurado Vercel:"
    echo "1. Ve a https://vercel.com"
    echo "2. Importa tu repositorio ReactNexusS"
    echo "3. Click en Deploy"
else
    echo "❌ Error al hacer push"
    exit 1
fi
