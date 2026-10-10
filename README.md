# harishraju.tech

My portfolio. Plain HTML and CSS: no build step, no JavaScript.

| Path | What |
| --- | --- |
| `index.html` | Home: summary, numbers, selected work, approach, skills |
| `work/<project>/index.html` | Case studies |
| `assets/style.css` | The only stylesheet (light, dark and print) |
| `assets/og.png` | Link-preview image (1200×630) |
| `deploy/harishraju.tech.conf` | Nginx server block |
| `.github/workflows/deploy.yml` | Push to `main`: pull on the VPS, rsync into `/var/www/harishraju.tech` |

## Preview locally

```bash
python3 -m http.server 8000   # http://localhost:8000
```

## One-time VPS setup

Get the certificate before enabling the site: the config references the cert files, so `nginx -t` fails without them. The config uses `listen 443 ssl http2;` because Ubuntu's nginx 1.24 doesn't know the newer `http2 on;` directive.

```bash
sudo mkdir -p /var/www/harishraju.tech && sudo chown deploy:deploy /var/www/harishraju.tech
git clone https://github.com/harisharaju1/portfolio-2026.git ~/projects/portfolio
rsync -a --delete --exclude .git --exclude .github --exclude deploy --exclude README.md ~/projects/portfolio/ /var/www/harishraju.tech/
sudo certbot certificates                                                  # skip the next line if harishraju.tech is listed
sudo certbot certonly --nginx -d harishraju.tech -d www.harishraju.tech
sudo cp ~/projects/portfolio/deploy/harishraju.tech.conf /etc/nginx/sites-available/
sudo ln -sf /etc/nginx/sites-available/harishraju.tech.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

GitHub secrets: the same `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY` and `VPS_PORT` used by doctriage.
