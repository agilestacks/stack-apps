{{/*
Helm best practices: Labels and Annotations
https://helm.sh/docs/chart_best_practices/labels/

Kubernetes Labels and Selectors
https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#syntax-and-character-set
https://kubernetes.io/docs/concepts/overview/working-with-objects/common-labels/#labels
*/}}
{{ define "application.labels" }}
app.kubernetes.io/name: {{ .Chart.Name | trunc 63 | trimSuffix "-" | quote }}
helm.sh/chart: "{{ .Chart.Name }}-{{ .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}"
app.kubernetes.io/managed-by: {{ .Release.Service | trunc 63 | trimSuffix "-" | quote }}
app.kubernetes.io/instance: {{ .Release.Name | trunc 63 | trimSuffix "-" | quote }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | trunc 63 | trimSuffix "-" | quote }}
{{- end }}
app.kubernetes.io/component: "web-service"
{{ end }}
