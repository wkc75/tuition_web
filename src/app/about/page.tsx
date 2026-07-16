export default function About() {
    return (
        <main>
            {/* ===== About Me (with personal note merged in) ===== */}
            <section>
                <h1>About Me</h1>
                <p>
                    I am Wong Kin Chong, currently reading a double major in Computer
                    Science and Mathematics at the National University of Singapore.
                </p>
                <p>
                    I scored straight As across my O-Level and A-Level Math and Science
                    subjects — Triple Science, A Math and E Math at O-Level, and H2
                    Mathematics, H2 Physics and H2 Chemistry at A-Level. Over the past
                    5 years, I have tutored Math and Science for JC and O-Level students
                    across Singapore.
                </p>
                {/* Personal note */}
                <p>
                    My own path to these results was not a conventional one. Although
                    Singaporean, I grew up in Chaozhou, China, and attended local Chinese
                    schools until I was 16. My family was not well-off, so I started
                    working young — my first part-time job was in a factory in Primary 5.
                </p>
                <p>
                    When I returned to Singapore in 2018, I barely spoke English and had
                    to adjust to a completely new education system. With the help of my
                    teachers and a lot of deliberate practice, I scored well enough at
                    O-Levels to enter Hwa Chong Institution — and through JC, I balanced
                    part-time service crew jobs with my studies, working shifts even
                    during my A-Level exam period, and still came out with straight As.
                </p>
                <p>
                    That experience is why I tutor. I know first-hand that strong results
                    come from the right method and consistent practice, not raw talent —
                    and I want my students to get there faster and with less struggle
                    than I did.
                </p>
            </section>

            {/* ===== Testimonials =====
                Hidden until you have real quotes. Uncomment and fill in when ready.
                Do NOT ship visible placeholders.

            <section>
                <h2>What My Students Say</h2>
                <ul>
                    <li>
                        <blockquote>
                            "[Quote, 1–2 sentences]"
                        </blockquote>
                        <p>
                            — [Student], H2 Math, [School], improved from [X] to [Y]
                        </p>
                    </li>
                </ul>
            </section>
            */}

            {/* ===== Teaching Philosophy ===== */}
            <section>
                <h2>Teaching Philosophy</h2>
                <p>
                    Every topic starts with understanding. Before we touch any
                    examples or questions, I walk through the content with my students —
                    with clear explanations and demonstrations — until the concepts
                    genuinely make sense. Memorising steps without understanding is
                    where most students plateau.
                </p>
                <p>
                    Mastery of content is the foundation, but deliberate practice is
                    what turns understanding into exam performance. For every learning
                    outcome we cover, I walk students through worked examples
                    step by step. I believe in quality of practice over quantity —
                    perfect practice makes perfect. My priority is teaching students
                    how to analyse a question and attack it with what they know;
                    the correct answer follows naturally from the right approach.
                </p>
                <p>
                    As exams approach, we shift focus to speed and accuracy. I plan
                    lessons around each student's examination schedule, with timed
                    practice built in so they walk into the exam hall prepared.
                </p>
            </section>

            {/* ===== Subjects Taught ===== */}
            <section>
                <h2>Subjects Taught</h2>
                <table>
                    <thead>
                        <tr>
                            <th>O-Level</th>
                            <th>A-Level (JC)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>A Math</td>
                            <td>H2 Mathematics</td>
                        </tr>
                        <tr>
                            <td>E Math</td>
                            <td>H2 Physics</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    );
}