"""rename_chatapp_sessions_to_pokegpt_sessions

Revision ID: a76bc51b7bdb
Revises: 1dc8ef2a54a4
Create Date: 2025-03-27 10:12:01.862491

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'a76bc51b7bdb'
down_revision: Union[str, None] = '1dc8ef2a54a4'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Rename table from chatapp_sessions to pokegpt_sessions
    op.rename_table('chatapp_sessions', 'pokegpt_sessions')


def downgrade() -> None:
    # Rename table back to chatapp_sessions
    op.rename_table('pokegpt_sessions', 'chatapp_sessions')
