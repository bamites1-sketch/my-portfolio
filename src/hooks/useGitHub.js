import { useState, useEffect } from 'react'
import axios from 'axios'

const USERNAME = 'bamites1-sketch'
const BASE = 'https://api.github.com'

export function useGitHubProfile() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${BASE}/users/${USERNAME}`)
      .then(r => setData(r.data))
      .catch(() => setData({
        login: USERNAME,
        name: 'Beamlak',
        bio: '💻 Full-Stack Developer\n🎓 3rd Year Software Engineering Student\n👩‍💻 Learning • Building • Growing\nAlways improving 🚀',
        avatar_url: `https://avatars.githubusercontent.com/u/248156558?v=4`,
        public_repos: 3,
        followers: 0,
        following: 1,
        html_url: `https://github.com/${USERNAME}`,
      }))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${BASE}/users/${USERNAME}/repos?sort=updated&per_page=30`)
      .then(r => {
        const filtered = r.data.filter(repo => !repo.fork && repo.name !== USERNAME)
        setRepos(filtered)
      })
      .catch(() => setRepos([
        {
          id: 1, name: 'portfolio-website', description: 'My personal developer portfolio built with React and Tailwind CSS',
          html_url: `https://github.com/${USERNAME}/portfolio-website`, stargazers_count: 2,
          language: 'JavaScript', updated_at: new Date().toISOString(), topics: ['react', 'tailwind', 'frontend'],
        },
        {
          id: 2, name: 'task-manager-app', description: 'A full-stack task management application with authentication',
          html_url: `https://github.com/${USERNAME}/task-manager-app`, stargazers_count: 1,
          language: 'JavaScript', updated_at: new Date().toISOString(), topics: ['nodejs', 'express', 'mongodb'],
        },
        {
          id: 3, name: 'weather-dashboard', description: 'Real-time weather dashboard using OpenWeather API',
          html_url: `https://github.com/${USERNAME}/weather-dashboard`, stargazers_count: 0,
          language: 'JavaScript', updated_at: new Date().toISOString(), topics: ['react', 'api', 'frontend'],
        },
      ]))
      .finally(() => setLoading(false))
  }, [])

  return { repos, loading }
}
